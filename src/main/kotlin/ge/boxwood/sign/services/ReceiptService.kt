package ge.boxwood.sign.services

import ge.boxwood.sign.model.Receipt

interface ReceiptService {
    fun create(receipt: Receipt): Receipt

    fun delete(id: Long?)

    fun getAll(): List<Receipt>

    fun getOne(id: Long?): Receipt

    fun save(receipt: Receipt)

    fun getQR(fileId: String): ByteArray
    fun sendSingleSms(mobile: String, text: String)
}