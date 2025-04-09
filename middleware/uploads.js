import fs from 'fs';

const uploadImage = (req, res, next) => {
    const maxSizeInMB = 2;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    const allowedTypes = ['png', 'jpg', 'jpeg', 'webp']; // ✅ Allowed file types

    const d = new Date();

    const entries = Object.entries(req.body);

    for (const [key, value] of entries) {
        if (typeof value === 'string' && value.startsWith('data:')) {
            const matches = value.match(/^data:(.+);base64,(.+)$/);
            if (!matches || matches.length !== 3) {
                return res.json({ statusCode: 200, message: `Invalid Base64 format in field: ${key}` });
            }

            const fileType = matches[1].split('/')[1];
            const fileData = matches[2];

            // ✅ File type validation
            if (!allowedTypes.includes(fileType.toLowerCase())) {
                return res.json({
                    statusCode: 200,
                    message: `${key} has an invalid file type. Allowed: ${allowedTypes.join(', ')}`,
                });
            }

            const fileSizeInBytes = (fileData.length * 3) / 4;

            if (fileSizeInBytes > maxSizeInBytes) {
                return res.json({
                    statusCode: 200,
                    message: `${key} image exceeds ${maxSizeInMB}MB limit`,
                });
            }

            

            const fileName = `${d.getFullYear()}${d.getTime()}${d.getMilliseconds()}${Math.floor(Math.random() * 1000)}.${fileType}`;
            const filePath = `uploads/${fileName}`;

            try {
                fs.writeFileSync(filePath, fileData, 'base64');
                req.body[key] = fileName; // Replace base64 with saved filename
            } catch (err) {
                return res.json({
                    statusCode: 200,
                    message: `File save failed for ${key}`,
                    error: err,
                });
            }
        }
    }

    next();
};

export default uploadImage;
