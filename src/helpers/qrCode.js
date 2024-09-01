const QRCode = require('qrcode');


exports.createQrCodeToAURL = async (urlToEncode) => {
    try {
        
        return await QRCode.toDataURL(urlToEncode, {
            errorCorrectionLevel: 'H', // Choose error correction level (L, M, Q, H)
            margin: 4, // Set the margin around the QR code
            color: {
                dark: '#000000', // Dark color
                light: '#FFFFFF', // Light color
            },
        });


    } catch (error) {
        console.log(error);
        throw error;
    }
}
