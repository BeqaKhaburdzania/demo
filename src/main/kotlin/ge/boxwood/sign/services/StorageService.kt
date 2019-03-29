package ge.boxwood.sign.services

//import ge.boxwood.sign.model.User
import org.springframework.web.multipart.MultipartFile

/**
 *
 * @author
 * @since
 */
interface StorageService {

  /**
   *
   * @param byteFile
   * @return
   */
  fun create(byteFile: ByteArray): String

  /**
   *
   * @param multipartFile
   * @param folder
   * @return
   */
  fun createLocal(multipartFile: MultipartFile, folder: String): String

  /**
   *
   * @param multipartFile
   * @param folder
   * @return
   */
  fun createLocalImageUpload(multipartFile: MultipartFile, folder: String): String

  /**
   *
   * @param uuid
   * @return
   */
  fun getBytes(uuid: String): ByteArray

  /**
   *
   * @param file
   * @param folder
   * @return
   */
  fun getLocal(file: String, folder: String): ByteArray

  /**
   *
   * @param search
   * @param user
   */
//  fun searchFiles(search: String, user: User)

}

