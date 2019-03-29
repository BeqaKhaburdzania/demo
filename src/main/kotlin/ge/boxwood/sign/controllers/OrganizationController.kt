package ge.boxwood.sign.controllers

import ge.boxwood.sign.model.Organization
import ge.boxwood.sign.services.CommunicationService
import ge.boxwood.sign.services.OrganizationService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.support.ServletUriComponentsBuilder
import qrCodeService.QRCodeGenerator

@RestController
@RequestMapping("/organization")

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
    "http://192.168.100.209:8080",
    "http://192.168.100.43:4756",
    "http://31.146.153.23:8888"])
class OrganizationController (val organizationService: OrganizationService, val communicationService: CommunicationService){


    @PostMapping("/add")
//    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    fun create(@RequestBody organization: Organization): ResponseEntity<Any> {
        var organizationObject = organizationService.create(organization)

        val location = ServletUriComponentsBuilder.fromCurrentServletMapping()
                .path("/organization/{id}").build().expand(organizationObject.id!!).toUri()

        return ResponseEntity.created(location).body(mapOf("id" to organizationObject.id))
    }

    @DeleteMapping("/delete/{id}")
//    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    fun deleteOrganization(@PathVariable("id") id: Long): ResponseEntity<Any> {
        var organization = organizationService!!.delete(id)
        return ResponseEntity.ok().build()
    }

    @GetMapping("/all")
    fun loadAll(): List<Organization> {
        return this.organizationService!!.getAll()
    }

    @GetMapping("/get/{id}")
    fun getOne(@PathVariable("id") id: Long): Organization {
        return this.organizationService!!.getOne(id)
    }

    @PutMapping("/update/{id}")
//    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    fun updateOrganization(@PathVariable("id") id: Long, @RequestBody organization: Organization): ResponseEntity<Any> {
        var organizationraw = organizationService!!.getOne(id)

        //TODO: aq unda shemowmdes yvela field rac eqneba organizations
        if(organization.name != null){
            organizationraw.name = organization.name
        }

        if(organization.organizationType != null){
            organizationraw.organizationType = organization.organizationType
        }

        if(organization.organizationID != null){
            organizationraw.organizationID = organization.organizationID
        }


        if(organization.addvertText != null){
            organizationraw.addvertText = organization.addvertText
        }

        organizationService.save(organizationraw)
        return ResponseEntity.ok().build()
    }

}