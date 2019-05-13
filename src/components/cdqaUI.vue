<template>
  <div class="input m-4" >
    <b-form @submit="onSubmit">
      <b-form-input id="input-large" size="lg" placeholder="Ask a question..." v-model="query"></b-form-input>
    </b-form>
    <br>

    <div v-if="status == 'loading'">
      <b-spinner small :variant="'primary'" label="Small Spinner"></b-spinner> Searching the answer...
    </div>

    <div v-else-if="status == 'done'">
      <b-button variant="primary" id="popover-button-sync">{{ prediction }}</b-button>
      <b-popover :placement="'bottom'" :show.sync="show" target="popover-button-sync">
        <template slot="title">Document Title <a href="/">(Link)</a></template>
        The paragraph of the retrieved article with <strong><span class="text-primary">the answer highlighted</span></strong> with some HTML.
      </b-popover>
    </div>

  </div>

</template>

<script>
import axios from 'axios';

export default {
  name: 'cdqaUI',
  data() {
    return {
      query: '',
      show: false,
      status: 'started',
      prediction: ''
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      this.status = 'loading'
      let self = this;
      axios.get("http://localhost:5000/api", { params: {query: self.query} })
      .then(function (response) {
        self.prediction = response.data.prediction;
        self.status = "done"
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
