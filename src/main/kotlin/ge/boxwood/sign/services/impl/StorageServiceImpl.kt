package ge.boxwood.sign.services.impl

//import ge.boxwood.sign.model.User
import ge.boxwood.sign.services.StorageService
import org.apache.commons.codec.binary.Base64
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.ByteArrayInputStream
import java.nio.file.Files
import java.nio.file.Paths
import java.util.*


@Service
class StorageServiceImpl : StorageService {

  @Value("\${colliers.ge.storage.directory}")
  private val storageFolder: String? = null

    override fun create(byteFile: ByteArray): String {
    val uuid = UUID.randomUUID().toString()
    val stream = ByteArrayInputStream(byteFile)
    Files.copy(stream, Paths.get(this.storageFolder).resolve(uuid))
    return uuid
  }

    override fun createLocal(multipartFile: MultipartFile, folder: String): String {
    var uuid = UUID.randomUUID().toString()
    Files.copy(multipartFile.inputStream, Paths.get(storageFolder + folder, uuid))
//    Files.copy(multipartFile.inputStream, Paths.get(storageFolder , uuid.toString()))

      return uuid
  }

  override fun createLocalImageUpload(multipartFile: MultipartFile, folder: String): String {
    var uuid = UUID.randomUUID().toString()
    Files.copy(multipartFile.inputStream, Paths.get(storageFolder + folder, uuid))
    return uuid
  }

  fun getBase64String(multipartFile: MultipartFile): String {
    return Base64.encodeBase64String(multipartFile.bytes)
  }

  override fun getBytes(uuid: String): ByteArray {
    try {
      val path = Paths.get(storageFolder + uuid)
      return Files.readAllBytes(path)
    } catch (e: Exception) {
      e.printStackTrace()
      return byteArrayOf()
    }
  }

  override fun getLocal(file: String, folder: String): ByteArray {

//    val path = Paths.get("/Users/xabu/workspace/ColliersListingNew/src/main/app/backgroundM/$file")
    val path = Paths.get("$storageFolder$folder/$file")
    return Files.readAllBytes(path)
  }

//  override fun searchFiles(search: String, user: User) {
//    TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
//  }

}

