<template>
  <img :src="'http://localhost:8000/'+src" style="width:150px" alt="" class="img-fluid" />
</template>

<script>
export default {
    props:{
        src:{
            type: String,
            required: true
        }
    }
}
</script>