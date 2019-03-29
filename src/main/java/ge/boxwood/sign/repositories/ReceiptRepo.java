package ge.boxwood.sign.repositories;

import ge.boxwood.sign.model.Receipt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReceiptRepo extends JpaRepository<Receipt, Long> {
}
