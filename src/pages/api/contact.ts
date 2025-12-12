import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// Habilitar server-side rendering para este endpoint
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { email, phone, message } = data;

    // Validar que todos los campos estén presentes
    if (!email || !phone || !message) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Todos los campos son requeridos' 
        }),
        { status: 400 }
      );
    }

    // Inicializar Resend con tu API key
    // IMPORTANTE: Necesitarás obtener una API key de https://resend.com
    const resend = new Resend(import.meta.env.RESEND_API_KEY);

    // Enviar el email
    const { data: emailData, error } = await resend.emails.send({
      from: 'Formulario de Contacto <onboarding@resend.dev>', // Email verificado en Resend
      to: ['edurikelm.88@gmail.com'], // Tu email
      subject: 'Nueva Consulta desde el Sitio Web',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ff6b35; border-bottom: 2px solid #ff6b35; padding-bottom: 10px;">
            Nueva Consulta Recibida
          </h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 5px;">📧 Email del Cliente:</h3>
            <p style="margin: 5px 0; padding: 10px; background-color: #f5f5f5; border-radius: 5px;">
              ${email}
            </p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 5px;">📱 Teléfono:</h3>
            <p style="margin: 5px 0; padding: 10px; background-color: #f5f5f5; border-radius: 5px;">
              ${phone}
            </p>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 5px;">💬 Mensaje:</h3>
            <p style="margin: 5px 0; padding: 10px; background-color: #f5f5f5; border-radius: 5px; white-space: pre-wrap;">
              ${message}
            </p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>Este mensaje fue enviado desde el formulario de contacto de tu sitio web.</p>
            <p>Fecha: ${new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Error enviando email:', error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Error al enviar el mensaje. Por favor, intenta nuevamente.' 
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: '¡Mensaje enviado exitosamente! Te contactaremos pronto.' 
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Error en el endpoint de contacto:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Error al procesar la solicitud' 
      }),
      { status: 500 }
    );
  }
};
