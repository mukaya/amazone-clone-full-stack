<template>
  <main>
    <div class="container-fluid" c-section>
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-spacing-top-medium"></div>
          <h2 style="text-align: center">Add a new Owner</h2>
          <form>
            <!-- Name -->
            <div class="a-spacing-top-medium">
              <label>Name</label>
              <input
                type="text"
                class="a-input-text"
                style="width:100%"
                v-model="name"
              />
            </div>
            <!-- About -->
            <div class="a-spacing-top-medium">
              <label>About</label>
              <input
                type="text"
                class="a-input-text"
                style="width:100%"
                v-model="about"
              />
            </div>

            <!-- Photo -->
            <div class="a-spacing-top-medium">
              <label style="margin-bottom: 0px;">Add photo</label>
              <div class="a-row a-spacing-top-medium">
                <label class="choosefile-button">
                  <i class="fal fa-plus"></i>
                  <input type="file" @change="onFileSelected" />
                  <p style="margin-top: -70px">{{ filename }}</p>
                </label>
              </div>
            </div>

            <!-- Button -->
            <div class="a-spacing-top-large">
              <span class="a-button-register">
                <span class="a-button-inner">
                  <span class="a-button-text" @click="onAddOwner"
                    >Add Owner</span
                  >
                </span>
              </span>
            </div>
          </form>
          <br />
          <ul class="list-group">
            <li class="list-group-item" v-for="owner in owners" :key="owner._id">
              {{ owner.name }}
            </li>
          </ul>
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
      let ownerResponse = await $axios.$get(`${process.env.API_URL}owners`);
      return {
        owners: ownerResponse.owners
      };
    } catch (error) {
      console.log(error);
    }
  },
  data() {
    return {
      name: "",
      selectedFile: null,
      filename: "",
      about: ""
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.filename = event.target.files[0].name;
    },
    async onAddOwner() {
      try {
       let data = new FormData();
        data.append("name", this.name);
        data.append("about", this.about);
        data.append("photo", this.selectedFile, this.selectedFile.name);

        let response = await this.$axios.$post(
          `${process.env.API_URL}owners`,
          data
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
