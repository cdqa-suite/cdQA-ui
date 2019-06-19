<template>
  <div class="cdqaUI">
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
      integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay"
      crossorigin="anonymous"
    >
    <div class="input m-4">
      <toggle-button
        class="mb-3"
        v-model="gpu"
        :value="false"
        color="#AE41A7"
        :sync="true"
        :width="55"
        :labels="{checked: 'GPU', unchecked: 'CPU'}"
      />
      <b-form @submit="onSubmit">
        <b-input-group>
          <b-dropdown slot="prepend" text="Choose an example..." variant="outline-secondary" size="sm">
            <b-dropdown-item v-for="i in queries_examples" :key="i" @click="query = i">{{ i }}</b-dropdown-item>
          </b-dropdown>
          <b-form-input v-model="query" placeholder="or type a question..."></b-form-input>
          <b-input-group-append>
            <b-button class="gradient-fill background hover" @click="onSubmit">
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
  </div>
</template>

<script>
import axios from "axios";
import Highlighter from "vue-highlight-words";
import { ToggleButton } from 'vue-js-toggle-button'

export default {
  name: "CdqaUI",
  components: {
    Highlighter,
    ToggleButton
  },
  props: {
    api_endpoint: {
      type: String,
      default: "http://localhost:5000/api"
    },
    queries_examples: {
      type: Array,
      default: function () {
        return ['What is Artificial Intelligence?', 'What is Blockchain?']
      }
    },
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
        .get(self.api_endpoint, { params: { query: self.query } })
        .then(function(response) {
          self.answer = response.data.answer;
          self.title = response.data.title;
          self.paragraph = response.data.paragraph;
          self.status = "done";
        })
        .catch(function(error) {
          alert(error);
        });
    }
  }
};
</script>

<style scoped>
.cdqaUI {
  text-align: left;
  font-family: Inter, Inter UI, Inter-UI, SF Pro Display, SF UI Text,
    Helvetica Neue, Helvetica, Arial, sans-serif;
  font-weight: 400;
  letter-spacing: +0.37px;
  color: rgb(175, 175, 175);
}

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
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 20px;
  font-weight: 700;
  line-height: 2.5;
}
</style>