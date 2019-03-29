package ge.boxwood.sign.model.enums;

public enum Status {

  ACTIVE(1, "ACTIVE"),
  DELETED(2, "DELETED"),
  LOCKED(3, "LOCKED"),
  EMAIL_NOT_VERIFIED(4, "EMAIL_NOT_VERIFIED"),
  SMS_NOT_VERIFIED(5, "SMS_NOT_VERIFIED"),
  TOO_MANY_FAILED_LOGIN(6, "TOO_MANY_FAILED_LOGIN"),
  TENTATIVE(7, "TENTATIVE"),
  ORDERED(8, "ORDERED"),
  CANCELED(9, "CANCELED"),
  PAID(10, "PAID"),
  OLD_MOVEMENT(11, "OLD_MOVEMENT");

  private int id;
  private String name;

  Status(int id, String name) {
    this.id = id;
    this.name = name;
  }

  public static Status getFromId(int id) {
    for (Status status : Status.values()) {
      if (status.getId() == id) {
        return status;
      }
    }
    throw new RuntimeException("Status with provided id[" + id + "] not found");
  }

  public int getId() {
    return id;
  }

  public static Status getFromName(String name) {
    for (Status status : Status.values()) {
      if (status.getName().equals(name)) {
        return status;
      }
    }
    throw new RuntimeException("Status with provided name[" + name + "] not found");
  }

  public String getName() {
    return name;
  }
}
