<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium"></div>
            <h2 style="text-align: center">Update {{product.title}}</h2>
            <form>
              <!-- Category dropdown -->
              <div class="a-spacing-top-medium">
                <label>Category</label>
                <select class="a-select-option" v-model="categoryID">
                  <option
                    v-for="category in categories"
                    :key="category._id"
                    :value="category._id"
                    >{{ category.type }}</option
                  >
                </select>
              </div>
              <!-- Owner dropdown -->
              <div class="a-spacing-top-medium">
                <label for="owner">Owner</label>
                <select class="a-select-option" v-model="ownerID">
                  <option
                    v-for="owner in owners"
                    :key="owner._id"
                    :value="owner._id"
                    >{{ owner.name }}</option
                  >
                </select>
              </div>
              <!-- Title -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">Title</label>
                <input
                  type="text"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="title"
                  :placeholder="product.title"
                />
              </div>

              <!-- price -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">Price</label>
                <input
                  type="number"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="price"
                   :placeholder="product.price"
                />
              </div>

              <!-- price -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">Stock Quantity</label>
                <input
                  type="number"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="stockQuantity"
                   :placeholder="product.stockQuantity"
                />
              </div>

              <!-- Description -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px" for="">Description</label>
                <textarea
                  style="width: 100%"
                  v-model="description"
                   :placeholder="product.description"
                ></textarea>
              </div>

              <!-- Photo -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px;">Add photo</label>
                <div class="a-row a-spacing-top-medium">
                  <label class="choosefile-button">
                    <i class="fal fa-plus"></i>
                    <input type="file" @change="onFileSelected" />
                    <p style="margin-top: -70px">{{ product.filename }}</p>
                  </label>
                </div>
              </div>
              <!-- Button -->
              <div class="a-spacing-top-large">
                <span class="a-button-register">
                  <span class="a-button-inner">
                    <span class="a-button-text" @click="onUpdateProduct(product._id)"
                      >Update Product</span
                    >
                  </span>
                </span>
              </div>
            </form>
          </div>
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    try {
      let categories = $axios.$get(`${process.env.API_URL}categories`);
      let owners = $axios.$get(`${process.env.API_URL}owners`);
      let product = $axios.$get(`${process.env.API_URL}products/${params.id}`);
   
      const [catResponse, ownerResponse, productResponse] = await Promise.all([
        categories,
        owners,
        product
      ]);
      return {
        categories: catResponse.categories,
        owners: ownerResponse.owners,
        product: productResponse.product
      };
    } catch (error) {
      console.log(error);
    }
  },
  data() {
    return {
      categoryID: null,
      ownerID: null,
      title: "",
      price: 0,
      description: "",
      selectedFile: null,
      filename: "",
      stockQuantity: 1
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.filename = event.target.files[0].name;
    },
    async onUpdateProduct(id) {
      try {
        let data = new FormData();
        data.append("title", this.title);
        data.append("price", this.price);
        data.append("description", this.description);
        data.append("ownerID", this.ownerID);
        data.append("stockQuantity", this.stockQuantity);
        data.append("categoryID", this.categoryID);
        data.append("photo", this.selectedFile, this.selectedFile.name);

        let result = await this.$axios.$put(
          `${process.env.API_URL}products/${id}`,
          data
        );

        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
