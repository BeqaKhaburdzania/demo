package ge.boxwood.sign.model.converter;


import ge.boxwood.sign.model.enums.Status;

import javax.persistence.AttributeConverter;

public class StatusConverter implements AttributeConverter<Status, Integer> {
  @Override
  public Integer convertToDatabaseColumn(Status status) {
    return status.getId();
  }

  @Override
  public Status convertToEntityAttribute(Integer id) {
    return Status.getFromId(id);
  }
}
