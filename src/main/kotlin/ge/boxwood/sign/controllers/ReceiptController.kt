package ge.boxwood.sign.controllers

import ge.boxwood.sign.model.Organization
import ge.boxwood.sign.model.Receipt
import ge.boxwood.sign.services.ReceiptService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.support.ServletUriComponentsBuilder
import qrCodeService.QRCodeGenerator
import javax.servlet.http.HttpServletResponse

@RestController
@RequestMapping("/receipt")

@CrossOrigin(origins = [
    "http://178.62.192.6:8088",
    "http://192.168.100.97:4200",
    "http://31.146.153.23:8086",
    "http://sign.ge",
    "http://192.168.100.100:8888",
    "http://192.168.100.80:80",
    "http://12.34.56.78:80",
    "http://12.34.56.78:4754",
    "http://192.168.100.80:4754",
    "http://12.34.56.78:4756",
    "http://192.168.100.80:4756",
    "http://192.168.100.209:8080",
    "http://31.146.153.23:4756",
    "http://192.168.100.43:4756",
    "http://31.146.153.23:8888"])
class ReceiptController(val receiptService: ReceiptService){

    @PostMapping("/add")
//    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    fun create( @RequestBody receipt: Receipt): ResponseEntity<Any> {
        var receiptObject = receiptService.create(receipt)

        val location = ServletUriComponentsBuilder.fromCurrentServletMapping()
                .path("/receipt/{id}").build().expand(receiptObject.id!!).toUri()

        return ResponseEntity.created(location).body(mapOf("id" to receiptObject.id))
    }

    @DeleteMapping("/delete/{id}")
//    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    fun deleteReceipt(@PathVariable("id") id: Long): ResponseEntity<Any> {
        var receipt = receiptService!!.delete(id)
        return ResponseEntity.ok().build()
    }

    @GetMapping("/all")
    fun loadAll(): List<Receipt> {
        return this.receiptService!!.getAll()
    }

    @GetMapping("/get/{id}")
    fun getOne(@PathVariable("id") id: Long): Receipt {
        return this.receiptService!!.getOne(id)
    }

    @PutMapping("/update/{id}")
//    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    fun updateReceipt(@PathVariable("id") id: Long, @RequestBody receipt: Receipt): ResponseEntity<Any> {
        var receiptraw = receiptService!!.getOne(id)

        //TODO: aq unda shemowmdes yvela field rac eqneba receipts
        if(receipt.name != null) {
            receiptraw.name = receipt.name
        }
        if(receipt.sum != null){
            receiptraw.sum = receipt.sum
        }

        receiptService.save(receiptraw)
        return ResponseEntity.ok().build()
    }

    @GetMapping("/getQR")
    fun getQR(response: HttpServletResponse){ //, @PathVariable("id") id: Long

//        var QR_CODE_IMAGE_PATH = "/Users/xabu/workspace/demo/src/main/app/qr/MyQRCode.png"
//        val randomInteger = (1000000..10000000).shuffled().first()
//        QRCodeGenerator.generateQRCodeImage(""+randomInteger,350,350,QR_CODE_IMAGE_PATH)

        response.contentType = "image/png"
        response.setHeader("filename", "picture")
        response.setHeader("Content-disposition", "attachment; filename=" + "picture")

        response.outputStream.write(receiptService.getQR("MyQRCode.png"))
        response.flushBuffer()
    }

    @PostMapping("/sendReceipt")
    fun sendReceipt(@RequestParam("mobile", defaultValue = "598769476") mobile: String,
                    @RequestParam("text", defaultValue = "www.boxwood.ge/toy/check/1.html") text: String){ //, @PathVariable("id") id: Long

        receiptService.sendSingleSms(mobile,text)
    }
}