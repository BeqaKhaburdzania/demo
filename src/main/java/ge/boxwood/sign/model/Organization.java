package ge.boxwood.sign.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "organization")
public class Organization extends BaseStatusEntity{

    @Column(name = "name")
    private String name;

    @Column(name = "organization_type")
    private String organizationType;

    @Column(name = "organization_id")
    private String organizationID;

    @Column(name = "password")
    private String  password;

    @Column(name = "addvert_text")
    private String addvertText;

    //TODO: odesgac aq mogviwevs ro chavsvat logo

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOrganizationType() {
        return organizationType;
    }

    public void setOrganizationType(String organizationType) {
        this.organizationType = organizationType;
    }

    public String getOrganizationID() {
        return organizationID;
    }

    public void setOrganizationID(String organizationID) {
        this.organizationID = organizationID;
    }

    public String getAddvertText() {
        return addvertText;
    }

    public void setAddvertText(String addvertText) {
        this.addvertText = addvertText;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
