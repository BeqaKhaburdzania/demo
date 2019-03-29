package ge.boxwood.sign.security.auth;

public class JwtAuthenticationRequest {
  private String password;
  private String username;

  public JwtAuthenticationRequest() {
    super();
  }

  public JwtAuthenticationRequest(String username, String password) {
    this.setUsername(username);
    this.setPassword(password);
  }

  public String getPassword() {
    return this.password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getUsername() {
    return this.username;
  }

  public void setUsername(String username) {
    this.username = username;
  }
}
