
// ACÁ ALMACENARÍA LAS FUNCIONES EXTERNAS Y QUE SE VAN A USAR EN DISTINTOS ARCHIVOS

function PlantillaEmail(data) {
    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>${process.env.NAME_MARCA}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body style="margin: 0; padding: 0;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">	
            <tr>
                <td style="padding: 10px 0 30px 0;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #cccccc; border-collapse: collapse;">
                        <tr>
                            <td align="center" bgcolor="#e9f3ff" style="padding: 20px 0 20px 0; color: #153643; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif;">
                                <img src="cid:logo@imagen" alt=${process.env.NAME_MARCA} width="300" height="80" style="display: block;" />
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#f3f3f3" style="padding: 40px 30px 40px 30px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td style="color: #153643; font-family: Arial, sans-serif; font-size: 18px;">
                                            <b>${data.titleEmail}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 14px; line-height: 20px;word-break: break-all;">
                                            ${data.contentEmail}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 10px; line-height: 20px;word-break: break-all;">
                                            ${data.anotherContentEmail}
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#d5d5d5" style="padding: 10px 30px 10px 30px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center" bgcolor="#b6b6b6" style="padding: 20px 0 20px 0; color: #153643; font-size: 10px; font-weight: bold; font-family: Arial, sans-serif;">
                                            Esto es un email automático, no responda este email.
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>
    `;
}

module.exports = { 
    PlantillaEmail
};