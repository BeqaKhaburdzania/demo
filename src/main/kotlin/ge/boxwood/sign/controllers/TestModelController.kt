package ge.boxwood.sign.controllers

import ge.boxwood.sign.model.TestModel
import ge.boxwood.sign.services.TestModelService
//import ge.boxwood.sign.services.UserService
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.servlet.support.ServletUriComponentsBuilder
import java.security.Principal
import javax.servlet.http.HttpServletResponse

/**
 *
 * @author
 * @since
 */
@RestController
@RequestMapping("/testmodel")

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
  "http://31.146.153.23:4756",
  "http://192.168.100.43:4756",
  "http://31.146.153.23:8888"])
class TestModelController(val testModelService: TestModelService
                          ) {//val userService: UserService

//  @PostMapping
//  @PreAuthorize("hasAnyRole('ADMIN','USER')")
//  fun create(user: Principal, @RequestBody testModel: TestModel): ResponseEntity<Any> {
////    var userObject = userService.getByUsername(user.name)
//    var testMOdelObject = testModelService.create(testModel)
//
//
//    val location = ServletUriComponentsBuilder.fromCurrentServletMapping()
//        .path("/testmodel/{id}").build().expand(testMOdelObject.id!!).toUri()
//    return ResponseEntity.created(location).body(mapOf("id" to testMOdelObject.id));
//  }
//
//  @GetMapping("/{id}")
//  @PreAuthorize("hasAnyRole('ADMIN','USER')")
//  fun get(@PathVariable("id") id: Long): ResponseEntity<Any> {
//    return ResponseEntity.ok(testModelService.getOne(id))
//  }
//
//  @GetMapping("/file/{id}")
//  @PreAuthorize("hasAnyRole('ADMIN','USER')")
//  fun getFile(response: HttpServletResponse, user: Principal, @PathVariable("id") id: String) {
//    response.contentType = "image/jpg"
//    response.setHeader("filename", "picture")
//    response.setHeader("Content-disposition", "attachment; filename=" + "picture")
//    response.outputStream.write(testModelService.getFile(id))
//    response.flushBuffer()
//  }
//
//  @PostMapping("/{id}/files")
//  @PreAuthorize("hasAnyRole('ADMIN','USER')")
//  fun uploadPic(multipartFile: MultipartFile, @PathVariable("id") id: Long): ResponseEntity<Any> {
//    var fileId = testModelService.addFile(testModelService.getOne(id), multipartFile)
//    val location = ServletUriComponentsBuilder.fromCurrentServletMapping()
//        .path("/testmodel/file/{id}").build().expand(fileId).toUri()
//    return ResponseEntity.created(location).body(mapOf("id" to fileId));
//  }

}

