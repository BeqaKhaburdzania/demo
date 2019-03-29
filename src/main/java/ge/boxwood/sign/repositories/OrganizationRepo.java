package ge.boxwood.sign.repositories;

import ge.boxwood.sign.model.Organization;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganizationRepo extends JpaRepository<Organization, Long> {
}
