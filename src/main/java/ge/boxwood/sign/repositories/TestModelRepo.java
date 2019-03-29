package ge.boxwood.sign.repositories;

import ge.boxwood.sign.model.TestModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestModelRepo extends JpaRepository<TestModel, Long> {
}
