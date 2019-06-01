<template>
  <div class="input m-4">
    <toggle-button
      class="mb-3"
      v-model="gpu"
      :value="false"
      color="#AE41A7"
      :sync="true"
      width="55"
      :labels="{checked: 'GPU', unchecked: 'CPU'}"
    />
    <b-form @submit="onSubmit">
      <b-input-group>
        <b-form-input placeholder="Ask a question..." v-model="query"></b-form-input>
        <b-input-group-append>
          <b-button class="gradient-fill background hover">
            <b-spinner v-if="status == 'loading'" small :variant="'white'" label="Small Spinner"></b-spinner>
            <i v-else class="fa fa-search"></i>
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form>
    <br>

    <div v-if="status == 'done' && query != ''">
      <div class="mb-4">
        <span class="gradient-fill">Answer</span>
        <br>
        <span>{{ answer }}</span>
      </div>
      <div class="mb-4">
        <span class="gradient-fill">Passage Context</span>
        <br>
        <Highlighter
          highlightClassName="gradient-fill background hover"
          :searchWords="[answer]"
          :autoEscape="true"
          :textToHighlight="paragraph"
        />
      </div>
      <span class="gradient-fill">Original Document</span>
      <br>
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Highlighter from "vue-highlight-words";

export default {
  name: "cdqaUI",
  components: {
    Highlighter
  },
  data() {
    return {
      query: "",
      show: false,
      status: "started",
      answer: "",
      title: "",
      paragraph: "",
      gpu: false
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.status = "loading";
      let self = this;
      axios
        .get("http://localhost:5000/api", { params: { query: self.query } })
        .then(function(response) {
          self.answer = response.data.answer;
          self.title = response.data.title;
          self.paragraph = response.data.paragraph;
          self.status = "done";
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.form-control:focus {
  border-color: #ae41a7 !important;
  box-shadow: 0 0 5px #ae41a7 !important;
}

.gradient-fill {
  background-image: linear-gradient(
    -225deg,
    #a445b2 0%,
    #d41872 52%,
    #ff0066 100%
  );
}

.gradient-fill.background {
  background-size: 250% auto;
  border: medium none currentcolor;
  border-image: none 100% 1 0 stretch;
  transition-delay: 0s, 0s, 0s, 0s, 0s, 0s;
  transition-duration: 0.5s, 0.2s, 0.2s, 0.2s, 0.2s, 0.2s;
  transition-property: background-position, transform, box-shadow, border,
    transform, box-shadow;
  transition-timing-function: ease-out, ease, ease, ease, ease, ease;
  color: white;
  font-weight: bold;
  border-radius: 3px;
}

span.gradient-fill {
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-fill-color: transparent;
  background-attachment: scroll;
  background-clip: text;
  background-color: transparent;
  background-origin: padding-box;
  background-position: 0 0;
  background-repeat: repeat;
  background-size: auto;
  font-size: 20px;
  font-weight: 700;
  line-height: 2.5;
}
</style>