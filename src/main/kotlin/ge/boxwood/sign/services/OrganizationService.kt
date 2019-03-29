package ge.boxwood.sign.services

import ge.boxwood.sign.model.Organization

interface OrganizationService {


    fun create(organization: Organization): Organization

    fun delete(id: Long?)

    fun getAll(): List<Organization>

    fun getOne(id: Long?): Organization

    fun save(organization: Organization)
}