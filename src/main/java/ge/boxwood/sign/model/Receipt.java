package ge.boxwood.sign.model;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "receipt")
public class Receipt extends BaseStatusEntity{
    @Column(name = "name")
    private String name;

    @Column(name = "identification_code")
    private String identificationCode;

    @Column(name = "branch")
    private String branch;

    @Column(name = "cashier")
    private String cashier;

    @Column(name = "date_created")
    private Timestamp dateCreated;

    //TODO: aq samomavlod unda iyos productebze bma

    @Column(name = "sum")
    private Double sum;

    @Column(name = "qr_code")
    private String qrCode;

    @Column(name = "transaction_id")
    private String transactionID;

    @ManyToOne
    @JoinColumn(name = "organization_id")
    private Organization organization;

    //TODO: raxan aq gvaqvs organization chekistvis sachiro infos (kompaniis saxeli da sareklamo teqsti) , davitrevt organizationidan
    // prosta exla chekis sheqmnisas user rogorc eseteboda propertis listinghsi ise dausete aqac (iq usernamidan igebdi users da aq prosta selectic wava ro pirvelive daitrio)

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIdentificationCode() {
        return identificationCode;
    }

    public void setIdentificationCode(String identificationCode) {
        this.identificationCode = identificationCode;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getCashier() {
        return cashier;
    }

    public void setCashier(String cashier) {
        this.cashier = cashier;
    }

    public Timestamp getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Timestamp dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Double getSum() {
        return sum;
    }

    public void setSum(Double sum) {
        this.sum = sum;
    }

    public String getQrCode() {
        return qrCode;
    }

    public void setQrCode(String qrCode) {
        this.qrCode = qrCode;
    }

    public String getTransactionID() {
        return transactionID;
    }

    public void setTransactionID(String transactionID) {
        this.transactionID = transactionID;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }
}
