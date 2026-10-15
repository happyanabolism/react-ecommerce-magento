import { graphql } from '@shared/api';

export const PRODUCTS = graphql(`
  query products(
    $filter: ProductAttributeFilterInput
    $pageSize: Int
    $currentPage: Int
  ) {
    products(filter: $filter, pageSize: $pageSize, currentPage: $currentPage) {
      items {
        ...productCardFields
      }
      page_info {
        total_pages
        current_page
      }
    }
  }
`);

export const PRODUCT_CART_FIELDS = graphql(`
  fragment productCardFields on ProductInterface {
    uid
    name
    sku
    url_key
    image {
      url
    }
    price_range {
      ...ProductPriceRange
    }
  }
`);

export const PRODUCT_PRICE_RANGE = graphql(`
  fragment ProductPriceRange on PriceRange {
    minimum_price {
      regular_price {
        ...Money
      }
      final_price {
        ...Money
      }
    }
    maximum_price {
      regular_price {
        ...Money
      }
      final_price {
        ...Money
      }
    }
  }
`);

const CONFIGURABLE_PRODUCT_FRAGMENT = graphql(`
  fragment ConfigurableProduct on ConfigurableProduct {
    configurable_options {
      ...ConfigurableProductOptions
    }
    variants {
      ...ProductVariant
    }
  }
`);

const PRODUCT_VARIANT_FRAGMENT = graphql(`
  fragment ProductVariant on ConfigurableVariant {
    attributes {
      ...ConfigurableAttributeOption
    }
    product {
      ...ProductDetails
    }
  }
`);

const PRODUCT_DETAILS_FRAGMENT = graphql(`
  fragment ProductDetails on ProductInterface {
    uid
    sku
    name
    description {
      html
    }
    thumbnail {
      ...productImage
    }
    image {
      ...productImage
    }
    media_gallery {
      ...ProductMediaGallery
    }
    price_range {
      ...ProductPriceRange
    }
  }
`);

const CONFIGURABLE_PRODUCT_OPTIONS_FRAGMENT = graphql(`
  fragment ConfigurableProductOptions on ConfigurableProductOptions {
    uid
    attribute_uid
    attribute_code
    label
    position
    use_default
    values {
      ...SwatchValue
    }
  }
`);

const CONFIGURABLE_ATTRIBUTE_OPTION_FRAGMENT = graphql(`
  fragment ConfigurableAttributeOption on ConfigurableAttributeOption {
    code
    uid
  }
`);

const PRODUCT_IMAGE_FRAGMENT = graphql(`
  fragment productImage on ProductImage {
    url
    label
  }
`);

const CONFIGURABLE_PRODUCT_OPTIONS_VALUES_FRAGMENT = graphql(`
  fragment SwatchValue on ConfigurableProductOptionsValues {
    uid
    label
    swatch_data {
      __typename
      value
      ... on ImageSwatchData {
        thumbnail
      }
    }
  }
`);

const PRODUCT_MEDIA_GALLERY_FRAGMENT = graphql(`
  fragment ProductMediaGallery on MediaGalleryInterface {
    disabled
    label
    position
    url
  }
`);
