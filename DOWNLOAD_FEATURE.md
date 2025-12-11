# Fitur Download Putusan - ServerDaerah

## Struktur Folder

```
ServerDaerah/
└── storage/
    ├── putusan/       # Folder untuk menyimpan file dokumen putusan
    └── temp/          # Folder temporary untuk upload process
```

## API Endpoints

### 1. Upload Dokumen Putusan

**Endpoint:** `POST /api/v1/{LEMBAGA_ID}/putusan/:id/upload`

**Headers:**
```
x-api-key: {API_KEY}
Authorization: Bearer {JWT_TOKEN}
Content-Type: multipart/form-data
```

**Body:**
```
Form Data:
- dokumen: File (PDF/DOC/DOCX, max 10MB)
```

**Response (Success - 200):**
```json
{
  "error": false,
  "message": "Document uploaded successfully",
  "data": {
    "id": "uuid",
    "url_dokumen": "/storage/putusan/putusan_1702384021234.pdf",
    "filename": "putusan_1702384021234.pdf",
    "size": 245632
  }
}
```

**Response (Error):**
```json
{
  "error": true,
  "message": "Hanya file PDF dan DOC yang diperbolehkan" // atau pesan error lainnya
}
```

### 2. Download Dokumen Putusan

**Endpoint:** `GET /api/v1/{LEMBAGA_ID}/putusan/:id/download`

**Headers:**
```
x-api-key: {API_KEY}
```

**Response (Success - 200):**
- File binary (PDF/DOC/DOCX)
- Header Content-Disposition dengan filename

**Response (Error):**
```json
{
  "error": true,
  "message": "No document available for this putusan" // atau pesan error lainnya
}
```

## Cara Menggunakan

### Backend (Manual Upload via Insomnia/Postman)

1. **POST** ke `http://localhost:8989/api/v1/PNJKT/putusan/{id}/upload`
2. Set Header:
   - `x-api-key`: API key dari lembaga
   - `Authorization`: Bearer {JWT_TOKEN}
3. Body > Form Data:
   - Key: `dokumen`
   - Value: Pilih file (PDF/DOC)
4. Send

### Frontend (Automatic Download)

```javascript
// Fetch & Download
const response = await fetch(`${SERVER_DAERAH_URL}/api/v1/PNJKT/putusan/${id}/download`, {
  headers: {
    'x-api-key': API_KEY,
  },
});

const blob = await response.blob();
const url = window.URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `Putusan_${nomor}.pdf`;
document.body.appendChild(a);
a.click();
window.URL.revokeObjectURL(url);
document.body.removeChild(a);
```

## Middleware Upload (uploadMiddleware.js)

- **Storage**: Disk storage ke `/storage/putusan/`
- **Filename**: `putusan_{timestamp}.{ext}`
- **File Filter**: Hanya PDF, DOC, DOCX
- **Max Size**: 10 MB
- **Error Handling**: Otomatis hapus file jika upload gagal

## Fitur Keamanan

1. ✅ Validasi tipe file (MIME type + extension)
2. ✅ Limit ukuran file (10 MB)
3. ✅ API key middleware untuk autentikasi
4. ✅ JWT token untuk authorize upload
5. ✅ Cleanup file jika upload error
6. ✅ Replace file lama jika upload baru

## Flow Proxy dari ServerPusat

Saat user klik "Unduh PDF" di frontend:
1. Frontend GET ke ServerPusat → `/api/v1/putusan/:id`
2. ServerPusat proxy ke ServerDaerah → `/api/v1/{LEMBAGA_ID}/putusan/:id`
3. ServerPusat merge data (termasuk `url_dokumen`)
4. Frontend construct download URL: `{LEMBAGA_URL}/putusan/{ID}/download`
5. Frontend fetch with API key → Download file

## Testing

```bash
# Upload dokumen
curl -X POST http://localhost:8989/api/v1/PNJKT/putusan/{id}/upload \
  -H "x-api-key: API_KEY" \
  -H "Authorization: Bearer JWT_TOKEN" \
  -F "dokumen=@/path/to/file.pdf"

# Download dokumen
curl -X GET http://localhost:8989/api/v1/PNJKT/putusan/{id}/download \
  -H "x-api-key: API_KEY" \
  -o downloaded_putusan.pdf
```

