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
      <b-button variant="primary" id="popover-button-sync">{{ answer }}</b-button>
      <b-popover :placement="'bottom'" :show.sync="show" target="popover-button-sync">
        <template slot="title">{{ title }}</template>
        <Highlighter highlightClassName="highlight" :searchWords="[answer]" :autoEscape="true" :textToHighlight="paragraph"/>
      </b-popover>
    </div>

  </div>

</template>

<script>
import axios from 'axios';
import Highlighter from 'vue-highlight-words'

export default {
  name: 'cdqaUI',
  components: {
    Highlighter
  },
  data() {
    return {
      query: '',
      show: false,
      status: 'started',
      answer: '',
      title: '',
      paragraph: '',
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      this.status = 'loading'
      let self = this;
      axios.get("http://localhost:5000/api", { params: {query: self.query} })
      .then(function (response) {
        self.answer = response.data.answer;
        self.title = response.data.title;
        self.paragraph = response.data.paragraph;
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
  .highlight {
    background-color: yellow;
    font-weight: bold;
  }
</style>
