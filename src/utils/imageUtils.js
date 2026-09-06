/**
 * Utility to convert image files into compressed Base64 Data URLs.
 * Keeps payload lightweight (~25-60KB) for seamless database storage & fast uploads.
 */
export function fileToBase64(file, maxWidth = 500, quality = 0.75) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve("");

    if (!file.type.startsWith("image/")) {
      return reject(new Error("Selected file is not an image."));
    }

    // Use createImageBitmap for fast, hardware-accelerated mobile decoding if supported
    if (typeof createImageBitmap === "function") {
      createImageBitmap(file)
        .then((bitmap) => {
          let { width, height } = bitmap;
          const maxDim = maxWidth;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, width);
          canvas.height = Math.max(1, height);
          const ctx = canvas.getContext("2d");
          ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", quality));
        })
        .catch(() => {
          fallbackFileReader(file, maxWidth, quality, resolve, reject);
        });
      return;
    }

    fallbackFileReader(file, maxWidth, quality, resolve, reject);
  });
}

function fallbackFileReader(file, maxWidth, quality, resolve, reject) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    const img = new Image();
    img.src = e.target.result;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let { width, height } = img;
      const maxDim = maxWidth;

      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => {
      resolve(e.target.result);
    };
  };
  reader.onerror = (err) => reject(err);
}
