package ge.boxwood.sign.services.impl

import ge.boxwood.sign.model.Organization
import ge.boxwood.sign.model.enums.Status
import ge.boxwood.sign.repositories.OrganizationRepo
import ge.boxwood.sign.services.OrganizationService
import org.springframework.stereotype.Component

@Component
class OrganizationServiceImpl(val organizationRepo: OrganizationRepo) : OrganizationService {
    override fun create(organization: Organization): Organization {
        var organizationRaw = organization
        organizationRaw.status = Status.ACTIVE
        return organizationRepo.save(organizationRaw)
    }

    override fun delete(id: Long?) {
        val organization = organizationRepo.findOne(id)
        organization.status = Status.DELETED
        organizationRepo.save(organization)
    }

    override fun getAll(): List<Organization> {
        return organizationRepo.findAll().filter { organization -> organization.status == Status.ACTIVE }
    }

    override fun getOne(id: Long?): Organization {
        return organizationRepo.findOne(id)
    }

    override fun save(organization: Organization) {
        organizationRepo.save(organization)
    }
}