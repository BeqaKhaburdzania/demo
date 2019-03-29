package ge.boxwood.sign.services.impl

import ge.boxwood.sign.model.Receipt
import ge.boxwood.sign.model.enums.Status
import ge.boxwood.sign.repositories.ReceiptRepo
import ge.boxwood.sign.services.CommunicationService
import ge.boxwood.sign.services.OrganizationService
import ge.boxwood.sign.services.ReceiptService
import ge.boxwood.sign.services.StorageService
import org.joda.time.DateTime
import org.springframework.stereotype.Component
import qrCodeService.QRCodeGenerator
import java.sql.Timestamp


@Component
class ReceiptServiceImpl(val receiptRepo: ReceiptRepo,
                         val organizationService: OrganizationService,
                         val storageService: StorageService,
                         val communicationService: CommunicationService) : ReceiptService {
    override fun getQR(fileId: String): ByteArray {
        return storageService.getLocal(fileId, "/qr")
    }

    override fun create(receipt: Receipt): Receipt {
        var receiptRaw = receipt
        receiptRaw.status = Status.ACTIVE

        val now = Timestamp(DateTime.now().millis)
        receiptRaw.dateCreated = now

        //TODO: aq daeseteos aseve organizationic
        var organization = organizationService.getOne(1)
        receiptRaw.organization = organization
        var QR_CODE_IMAGE_PATH = "/Users/xabu/workspace/demo/src/main/app/qr/MyQRCode.png"
        val randomInteger = (1000000..10000000).shuffled().first()
        QRCodeGenerator.generateQRCodeImage(""+randomInteger,350,350,QR_CODE_IMAGE_PATH)
        communicationService.sendSms("www.boxwood.ge/toy/check/1.html   ")



        //TODO: aq samomavlod mogviwevs aseve gadmogzavnili productebis damatebac es imis shemdeg rac productebi calke table gveqneba
        // aris complicated logika procut sheidzleba ukve arsebobdes bazashi da imis damateba mogviwevs
        // an tu ar arsebobda jer is shevqmnat da mere davamtot aq
        return receiptRepo.save(receiptRaw)
    }

    override fun sendSingleSms(mobile:String,text:String){
        communicationService.sendSms(mobile,text)
    }

    override fun delete(id: Long?) {
        val receipt = receiptRepo.findOne(id)
        receipt.status = Status.DELETED
        receiptRepo.save(receipt)
    }

    override fun getAll(): List<Receipt> {
        return receiptRepo.findAll().filter { receipt -> receipt.status == Status.ACTIVE }
    }

    override fun getOne(id: Long?): Receipt {
        return receiptRepo.findOne(id)
    }

    override fun save(receipt: Receipt) {
        receiptRepo.save(receipt)
    }


}