const redisPublisher = require('../config/redis');

const CHANNELS = {
  PUTUSAN_CREATED: 'putusan:created',
  PUTUSAN_UPDATED: 'putusan:updated',
  PUTUSAN_DELETED: 'putusan:deleted',
};

class SyncPublisher {
  /**
   * Publish event saat putusan baru dibuat
   */
  static async publishPutusanCreated(putusanData) {
    try {
      const payload = {
        event: 'PUTUSAN_CREATED',
        timestamp: new Date().toISOString(),
        lembaga_id: process.env.LEMBAGA_ID || 'PNBJN',
        data: {
          id: putusanData.id,
          nomor: putusanData.nomor,
          tanggal_putusan: putusanData.tanggal_putusan,
          tanggal_upload: putusanData.tanggal_upload,
          klasifikasi: putusanData.klasifikasi,
          jenis_putusan: putusanData.amar_lainya,
          id_hakim_ketua: putusanData.id_hakim_ketua,
          id_panitera: putusanData.id_panitera,
          id_penuntut_umum: putusanData.id_penuntut_umum,
        },
      };

      await redisPublisher.publish(
        CHANNELS.PUTUSAN_CREATED,
        JSON.stringify(payload)
      );

      console.log(`[SYNC PUBLISHER] Published PUTUSAN_CREATED: ${putusanData.id}`);
      return true;
    } catch (err) {
      console.error('[SYNC PUBLISHER ERROR]', err);
      return false;
    }
  }

  /**
   * Publish event saat putusan diupdate
   */
  static async publishPutusanUpdated(putusanData) {
    try {
      const payload = {
        event: 'PUTUSAN_UPDATED',
        timestamp: new Date().toISOString(),
        lembaga_id: process.env.LEMBAGA_ID || 'PNBJN',
        data: {
          id: putusanData.id,
          nomor: putusanData.nomor,
          tanggal_putusan: putusanData.tanggal_putusan,
          tanggal_upload: putusanData.tanggal_upload,
          klasifikasi: putusanData.klasifikasi,
          jenis_putusan: putusanData.amar_lainya,
          id_hakim_ketua: putusanData.id_hakim_ketua,
          id_panitera: putusanData.id_panitera,
          id_penuntut_umum: putusanData.id_penuntut_umum,
        },
      };

      await redisPublisher.publish(
        CHANNELS.PUTUSAN_UPDATED,
        JSON.stringify(payload)
      );

      console.log(`[SYNC PUBLISHER] Published PUTUSAN_UPDATED: ${putusanData.id}`);
      return true;
    } catch (err) {
      console.error('[SYNC PUBLISHER ERROR]', err);
      return false;
    }
  }

  /**
   * Publish event saat putusan dihapus
   */
  static async publishPutusanDeleted(putusanId) {
    try {
      const payload = {
        event: 'PUTUSAN_DELETED',
        timestamp: new Date().toISOString(),
        lembaga_id: process.env.LEMBAGA_ID || 'PNBJN',
        data: {
          id: putusanId,
        },
      };

      await redisPublisher.publish(
        CHANNELS.PUTUSAN_DELETED,
        JSON.stringify(payload)
      );

      console.log(`[SYNC PUBLISHER] Published PUTUSAN_DELETED: ${putusanId}`);
      return true;
    } catch (err) {
      console.error('[SYNC PUBLISHER ERROR]', err);
      return false;
    }
  }
}

module.exports = SyncPublisher;
