package ge.boxwood.sign.services.impl

//import ge.boxwood.sign.model.User
import ge.boxwood.sign.services.CommunicationService
import ge.boxwood.sign.smsservice.GeoSmsService
import org.springframework.stereotype.Service

@Service
class CommunicationServiceImpl(val geoSmsService: GeoSmsService) : CommunicationService {

//  override fun sendEmail(email: String, text: String) {
//  }
//
//  override fun sendEmail(user: User, text: String) {
//  }

  override fun sendSms( text: String) { //user: User,
    geoSmsService.sendSingle("599984050", text)
  }

  override fun sendSms( mobile: String,text: String) { //user: User,
    geoSmsService.sendSingle(mobile, text)
  }

}

