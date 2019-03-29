package ge.boxwood.sign.services

//import ge.boxwood.sign.model.User

interface CommunicationService {

//  /**
//   *
//   * @param user
//   * @param text
//   */
//  fun sendEmail(user: User, text: String)
//
//  /**
//   *
//   * @param email
//   * @param text
//   */
//  fun sendEmail(email: String, text: String)

  /**
   *
   * @param user
   * @param text
   */
  fun sendSms( text: String) //user: User,

    fun sendSms(mobile: String, text: String)
}

