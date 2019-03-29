package ge.boxwood.sign.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "test_model")
public class TestModel extends BaseStatusEntity {
  @Column(name = "file_id")
  private String fileId;
  @Column(name = "name")
  private String name;
  @Column(name = "val")
  private Double val;

  public String getFileId() {
    return fileId;
  }

  public void setFileId(String fileId) {
    this.fileId = fileId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Double getVal() {
    return val;
  }

  public void setVal(Double val) {
    this.val = val;
  }
}
