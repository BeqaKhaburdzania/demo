package ge.boxwood.sign

import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Component
class ScheduleTest {
    @Scheduled(fixedRate = 2000)
    fun k(){

    }
}