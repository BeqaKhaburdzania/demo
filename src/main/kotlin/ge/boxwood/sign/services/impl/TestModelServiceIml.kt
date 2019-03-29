package ge.boxwood.sign.services.impl

import ge.boxwood.sign.model.TestModel
import ge.boxwood.sign.model.enums.Status
import ge.boxwood.sign.repositories.TestModelRepo
//import ge.boxwood.sign.services.StorageService
import ge.boxwood.sign.services.TestModelService
import org.springframework.stereotype.Component
import org.springframework.web.multipart.MultipartFile

@Component
class TestModelServiceIml(val testModelRepo: TestModelRepo
                          ) : TestModelService { //val storageService: StorageService

//  override fun addFile(testModel: TestModel, multipartFile: MultipartFile): String {
//    testModel.fileId = storageService.createLocal(multipartFile, "testModelFiles")
//    testModelRepo.save(testModel)
//    return testModel.fileId
//  }
//
//  override fun create(testModel: TestModel): TestModel {
//    testModel.status = Status.ACTIVE
//    return testModelRepo.save(testModel)
//  }
//
//  override fun getFile(id: String): ByteArray {
//    return storageService.getLocal(id, "testModelFiles")
//  }
//
//  override fun getOne(id: Long): TestModel {
//    return testModelRepo.findOne(id)
//  }

}

