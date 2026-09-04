/**
 * Utility to convert image files into compressed Base64 Data URLs.
 * Keeps payload lightweight (~20-50KB) for seamless database storage & rendering.
 */
export function fileToBase64(file, maxWidth = 350, quality = 0.8) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve("");
    
    // Fallback if not an image
    if (!file.type.startsWith("image/")) {
      return reject(new Error("Selected file is not an image."));
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => resolve(e.target.result); // Fallback to raw base64
    };
    reader.onerror = (err) => reject(err);
  });
}
