//package ge.boxwood.sign.security
//
//import ge.boxwood.sign.model.User
//import ge.boxwood.sign.providers.TimeProvider
//import io.jsonwebtoken.Claims
//import io.jsonwebtoken.Jwts
//import io.jsonwebtoken.SignatureAlgorithm
//import org.apache.commons.lang.StringUtils
//import org.joda.time.DateTime
//import org.springframework.beans.factory.annotation.Autowired
//import org.springframework.beans.factory.annotation.Value
//import org.springframework.mobile.device.Device
//import org.springframework.security.core.userdetails.UserDetails
//import org.springframework.stereotype.Component
//import java.util.*
//import javax.servlet.http.HttpServletRequest
//
//@Component
//class TokenHelper {
//
//  @Value("\${jwt.secret}")
//  var SECRET: String? = null
//  @Autowired
//  internal var timeProvider: TimeProvider? = null
//  @Value("\${app.name}")
//  private val APP_NAME: String? = null
//  @Value("\${jwt.header}")
//  private val AUTH_HEADER: String? = null
//  @Value("\${jwt.expires_in}")
//  private val EXPIRES_IN: Int = 0
//  @Value("\${jwt.mobile_expires_in}")
//  private val MOBILE_EXPIRES_IN: Int = 0
//  private val SIGNATURE_ALGORITHM = SignatureAlgorithm.HS512
//
//  companion object {
//
//    internal val AUDIENCE_MOBILE = "mobile"
//    internal val AUDIENCE_TABLET = "tablet"
//    internal val AUDIENCE_UNKNOWN = "unknown"
//    internal val AUDIENCE_WEB = "web"
//  }
//
//  fun generateRefreshToken(newToken: String, device: Device): String {
//    if (StringUtils.isBlank(getUsernameFromToken(newToken))) {
//      throw IllegalArgumentException("Cannot create JWT Token without username")
//    }
//
//    val currentTime = DateTime()
//
//    return Jwts.builder()
//        .setSubject(getUsernameFromToken(newToken))
//        .setClaims(getAllClaimsFromToken(newToken))
//        .setIssuer(APP_NAME)
//        .setId(UUID.randomUUID().toString())
//        .setIssuedAt(currentTime.toDate())
//        .setExpiration(generateExpirationDate(device))
//        .signWith(SIGNATURE_ALGORITHM, SECRET)
//        .compact()
//  }
//
//  fun generateToken(userContext: User, device: Device): String {
//    if (StringUtils.isBlank(userContext.username)) {
//      throw IllegalArgumentException("Cannot create JWT Token without username")
//    }
//
//    if (userContext.authorities == null || userContext.authorities.isEmpty()) {
//      throw IllegalArgumentException("User doesn't have any privileges")
//    }
//
//    val claims = Jwts.claims().setSubject(userContext.username)
//    claims["scopes"] = userContext.authorities
//
//    val currentTime = DateTime()
//
//    return Jwts.builder()
//        .setClaims(claims)
//        .setIssuer(APP_NAME)
//        .setIssuedAt(currentTime.toDate())
//        .setExpiration(generateExpirationDate(device))
//        .signWith(SIGNATURE_ALGORITHM, SECRET)
//        .compact()
//  }
//
//  fun getAudienceFromToken(token: String): String? {
//    var audience: String?
//    try {
//      val claims = this.getAllClaimsFromToken(token)
//      audience = claims!!.audience
//    } catch (e: Exception) {
//      audience = null
//    }
//
//    return audience
//  }
//
//  fun getAuthHeaderFromHeader(request: HttpServletRequest): String? {
//    return request.getHeader(AUTH_HEADER)
//  }
//
//  fun getExpiredIn(device: Device): Int {
//    return if (device.isMobile || device.isTablet) {
//      MOBILE_EXPIRES_IN
//    } else {
//      EXPIRES_IN
//    }
//  }
//
//  fun getIssuedAtDateFromToken(token: String): Date? {
//    var issueAt: Date?
//    try {
//      val claims = this.getAllClaimsFromToken(token)
//      issueAt = claims!!.issuedAt
//    } catch (e: Exception) {
//      issueAt = null
//    }
//
//    return issueAt
//  }
//
//  fun getToken(request: HttpServletRequest): String? {
//    /**
//     * Getting the token from Authentication header
//     * e.g Bearer your_token
//     */
//    val authHeader = getAuthHeaderFromHeader(request)
//    return if (authHeader != null && authHeader.startsWith("Bearer ")) {
//      authHeader.substring(7)
//    } else {
//      null
//    }
//  }
//
//  fun getUsernameFromToken(token: String): String? {
//    var username: String?
//    try {
//      val claims = this.getAllClaimsFromToken(token)
//      username = claims!!.subject
//    } catch (e: Exception) {
//      username = null
//    }
//
//    return username
//  }
//
//  fun refreshToken(token: String, device: Device): String? {
//    var refreshedToken: String?
//    val a = timeProvider!!.now()
//    try {
//      val claims = this.getAllClaimsFromToken(token)
//      claims!!.issuedAt = a
//      refreshedToken = Jwts.builder()
//          .setClaims(claims)
//          .setExpiration(generateExpirationDate(device))
//          .signWith(SIGNATURE_ALGORITHM, SECRET)
//          .compact()
//    } catch (e: Exception) {
//      refreshedToken = null
//    }
//
//    return refreshedToken
//  }
//
//  fun validateToken(token: String, userDetails: UserDetails): Boolean? {
//    val user = userDetails as User
//    val username = getUsernameFromToken(token)
//    val created = getIssuedAtDateFromToken(token)
//    return username != null
//        && username == userDetails.getUsername()
//        && !isCreatedBeforeLastPasswordReset(created, user.lastPasswordResetDate)
//  }
//
//  private fun generateAudience(device: Device): String {
//    var audience = AUDIENCE_UNKNOWN
//    if (device.isNormal) {
//      audience = AUDIENCE_WEB
//    } else if (device.isTablet) {
//      audience = AUDIENCE_TABLET
//    } else if (device.isMobile) {
//      audience = AUDIENCE_MOBILE
//    }
//    return audience
//  }
//
//  private fun generateExpirationDate(device: Device): Date {
//    val expiresIn = (if (device.isTablet || device.isMobile) {
//      MOBILE_EXPIRES_IN
//    } else {
//      EXPIRES_IN
//    }).toLong()
//    return Date(timeProvider!!.now().time + expiresIn * 1000)
//  }
//
//  private fun getAllClaimsFromToken(token: String): Claims? {
//    var claims: Claims?
//    try {
//      claims = Jwts.parser()
//          .setSigningKey(SECRET)
//          .parseClaimsJws(token)
//          .body
//    } catch (e: Exception) {
//      claims = null
//    }
//
//    return claims
//  }
//
//  private fun isCreatedBeforeLastPasswordReset(created: Date?, lastPasswordReset: Date?): Boolean {
//    return lastPasswordReset != null && created!!.before(lastPasswordReset)
//  }
//
//}
//
