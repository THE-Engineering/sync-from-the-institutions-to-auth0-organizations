export function getId({ iid }) {
  return iid;
}

export function getName({ name }) {
  return name;
}

export function getMetadata({
  web,
  latitude,
  longitude,
  currency,
  region,
  country,
  continent,
  address,
  phone,
  foundation_year: foundationYear,
}) {
  /**
   *  `metadata` allows for a maximum of 10 fields and does not like zero-length values
   *
   *  All fields are strings in the origin and destination
   */
  return {
    ...(web ? { web } : {}),
    ...(latitude ? { latitude } : {}),
    ...(longitude ? { longitude } : {}),
    ...(currency ? { currency } : {}),
    ...(region ? { region } : {}),
    ...(country ? { country } : {}),
    ...(continent ? { continent } : {}),
    ...(address ? { address } : {}),
    ...(phone ? { phone } : {}),
    ...(foundationYear ? { foundation_year: foundationYear } : {}),
  };
}

export function createMetaData(institution, organizationMetaData) {
  return {
    ...(organizationMetaData ?? {}),
    institutionId: getId(institution),
  };
}
