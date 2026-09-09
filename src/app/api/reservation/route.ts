import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, guests, date, time, zone, requests, language = 'sr' } = body;

    if (!name || !date || !time) {
      return NextResponse.json(
        { error: 'Missing required reservation fields (name, date, time)' },
        { status: 400 }
      );
    }

    // Bistro & Jars official concierge WhatsApp number in Belgrade
    const recipientPhone = process.env.RECIPIENT_PHONE || '381649876543';
    const whatsappToken = process.env.WHATSAPP_TOKEN;
    const phoneNumberId = process.env.PHONE_NUMBER_ID;

    // Compose formatted text for WhatsApp
    const messageText =
      language === 'sr'
        ? `☕ *Nova Rezervacija / Upit — Bistro & Jars Beograd*\n\n` +
          `👤 *Gost:* ${name}\n` +
          `📞 *Telefon:* ${phone || 'Nije navedeno'}\n` +
          `👥 *Broj osoba:* ${guests || 2}\n` +
          `📅 *Datum:* ${date}\n` +
          `⏰ *Vreme:* ${time}\n` +
          `📍 *Zona:* ${zone || 'Espreso Bar'}\n` +
          `📝 *Napomene:* ${requests || 'Nema posebnih zahteva'}\n\n` +
          `_Poslato sa zvaničnog veb sajta Bistro & Jars._`
        : `☕ *New Reservation / Inquiry — Bistro & Jars Belgrade*\n\n` +
          `👤 *Guest Name:* ${name}\n` +
          `📞 *Phone:* ${phone || 'Not specified'}\n` +
          `👥 *Party Size:* ${guests || 2}\n` +
          `📅 *Date:* ${date}\n` +
          `⏰ *Time:* ${time}\n` +
          `📍 *Seating Zone:* ${zone || 'Espresso Bar'}\n` +
          `📝 *Notes/Occasion:* ${requests || 'None'}\n\n` +
          `_Sent from Bistro & Jars official web portal._`;

    // Direct WhatsApp web/app link fallback
    const directUrl = `https://wa.me/${recipientPhone}?text=${encodeURIComponent(messageText)}`;

    // If WhatsApp Cloud API credentials are provided in env, trigger Meta Graph API
    let cloudApiStatus = 'unconfigured_fallback';
    let cloudApiResponse = null;

    if (whatsappToken && phoneNumberId) {
      try {
        const cloudApiRes = await fetch(
          `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${whatsappToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messaging_product: 'whatsapp',
              to: recipientPhone,
              type: 'text',
              text: { body: messageText },
            }),
          }
        );

        cloudApiResponse = await cloudApiRes.json();
        if (cloudApiRes.ok) {
          cloudApiStatus = 'sent_via_cloud_api';
        } else {
          cloudApiStatus = 'cloud_api_error_fallback';
        }
      } catch (err: any) {
        console.error('WhatsApp Cloud API dispatch error:', err);
        cloudApiStatus = 'dispatch_exception_fallback';
      }
    }

    return NextResponse.json({
      success: true,
      mode: cloudApiStatus,
      directUrl,
      formattedMessage: messageText,
      meta: {
        timestamp: new Date().toISOString(),
        cloudApiStatus,
        cloudApiResponse,
      },
    });
  } catch (error: any) {
    console.error('Reservation API handler error:', error);
    return NextResponse.json(
      { error: 'Failed to process reservation request', details: error.message },
      { status: 500 }
    );
  }
}
