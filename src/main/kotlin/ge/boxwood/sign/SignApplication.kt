package ge.boxwood.sign

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.Bean
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter
import java.util.*

fun main(args: Array<String>) {
  TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
  SpringApplication.run(SignApplication::class.java, *args)
}

@SpringBootApplication
class SignApplication {

  @Bean
  fun corsConfigurer(): WebMvcConfigurer {
    return object : WebMvcConfigurerAdapter() {

      override fun addCorsMappings(registry: CorsRegistry?) {
        registry!!.addMapping("/users").allowedOrigins("http://localhost:4200", "http://192.168.100.97:4200", "https://192.168.100.100:8888", "http://31.146.153.23:8086")
        registry!!.addMapping("/organization").allowedOrigins("http://localhost:8080", "http://192.168.100.97:4200", "https://192.168.100.100:8888", "http://31.146.153.23:8086")
        registry.addMapping("/company").allowedOrigins("http://localhost:4200", "http://192.168.100.97:4200", "https://192.168.100.100:8888", "http://31.146.153.23:8086")
        registry.addMapping("/auth").allowedOrigins("http://localhost:4200", "http://192.168.100.97:4200", "https://192.168.100.100:8888", "http://31.146.153.23:8086")
        registry.addMapping("/friendship").allowedOrigins("http://localhost:4200", "http://192.168.100.97:4200", "https://192.168.100.100:8888", "http://31.146.153.23:8086")
        registry.addMapping("/notifications").allowedOrigins("http://localhost:4200", "http://192.168.100.97:4200", "https://192.168.100.100:8888", "http://31.146.153.23:8086")
        registry.addMapping("/**")
            .allowedMethods("HEAD", "OPTION", "GET", "PUT", "POST", "DELETE", "PATCH")
      }

      @Bean
      fun passwordEncoder(): BCryptPasswordEncoder {
        return BCryptPasswordEncoder()
      }

    }
  }

}

