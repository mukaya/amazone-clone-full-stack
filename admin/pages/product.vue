<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium"></div>
            <h2 style="text-align: center">Add a new Product</h2>
            <form>
              <!-- Category dropdown -->
              <div class="a-spacing-top-medium">
                <label>Category</label>
                <select class="a-select-option">
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
                <select class="a-select-option">
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
                <input type="text" class="a-input-text" style="width: 100%" />
              </div>

              <!-- price -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">Price</label>
                <input type="number" class="a-input-text" style="width: 100%" />
              </div>

              <!-- Description -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px" for="">Title</label>
                <textarea
                  placeholder="Provide details such as a product description"
                  style="width: 100%"
                ></textarea>
              </div>

              <!-- Photo -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px;">Add photo</label>
                <div class="a-row a-spacing-top-medium">
                  <label class="choosefile-button">
                    <i class="fal fa-plus"></i>
                    <input type="file" />
                    <p style="margin-top: -70px">Name of</p>
                  </label>
                </div>
              </div>

              <hr />
              <div class="a-spacing-top-large">
                <span class="a-button-register">
                  <span class="a-button-inner">
                    <span class="a-button-text">Add Product</span>
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
  async asyncData({ $axios }) {
    try {
      let catResponse = await $axios.$get(`${process.env.API_URL}categories`);
      let ownerResponse = await $axios.$get(`${process.env.API_URL}owners`);
      return {
        categories: catResponse.categories,
        owners: ownerResponse.owners
      };
    } catch (error) {
      console.log(error.message);
    }
  }
};
</script>
