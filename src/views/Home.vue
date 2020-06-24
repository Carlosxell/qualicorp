<template>
  <div class="l-page--home">
    <form @submit.prevent="sendForm"
          class="form l-grid"
          novalidate>
      <div class="l-col--12 l-col--Xs6 l-col--Md4">
        <div class="field">
          <label class="label is-small"
                 for="state">Estado</label>
          <div class="control">
            <select @change="changeState"
                    class="select is-small is-fullwidth"
                    id="state"
                    v-model="formObj.uf">
              <option value=""
                      selected>Selecione</option>
              <option :key="ind"
                      :value="item.sigla"
                      v-for="(item, ind) in states">{{ item.nome }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="l-col--12 l-col--Xs6 l-col--Md4">
        <AutoComplete @OnChange="changeCity"
                      :data-list="cities"
                      :data-prop="cityInfo" />
      </div>

      <div class="l-col--12 l-col--Xs6 l-col--Md4">
        <AutoComplete @OnChange="changeJob"
                      :data-list="jobs"
                      :data-prop="jobInfo" />
      </div>
    </form>
  </div>
</template>

<script>
  import { getStates, getCities } from '../services/ibge-service';
  import { getJobs, getEntities, getPlans } from '../services/simulador-service';
  import AutoComplete from '../components/AutoComplete';

  export default {
    name: "Home",
    components: { AutoComplete },
    computed: {
      jobInfo() {
        return {
          label: 'Profissões',
          labelItem: 'profissao',
          disabled: !this.formObj.cidade,
          value: this.formObj.profissao,
          placeholder: 'Ex: Advogado'
        };
      },
      cityInfo() {
        return {
          label: 'Cidades',
          labelItem: 'nome',
          disabled: !this.formObj.uf,
          value: this.formObj.cidade,
          placeholder: 'Ex: São Paulo'
        };
      },
    },
    data: () => {
      return {
        cidade: null,
        entidade: null,
        profissao: null,
        formObj: {
          uf: '',
          value: '',
          cidade: '',
          entidade: '',
          profissao: '',
          datanascimento: '',
        },
        jobs: [],
        states: [],
        cities: [],
      };
    },
    created() {
      this.getInitialData();
    },
    methods: {
      changeJob(val) {
        this.formObj.profissao = val.nome;
      },
      clearCity() {
        this.cidade = null;
        this.formObj.cidade = '';
      },
      async changeCity(val) {
        let { clearStrCharacters, } = this.$options.filters;
        let cidade = clearStrCharacters(val.nome).toLowerCase();

        if (!val.nome) { return this.clearCity(); }

        this.cidade = val;
        this.formObj.cidade = val.nome;
        await getJobs(this.formObj.uf, cidade).then(res => this.jobs = res);
      },
      async changeState() {
        this.clearCity();
        this.cities = [];

        await getCities(this.formObj.uf).then(res => this.cities = res);
      },
      async getInitialData() {
        await getStates().then(res => this.states = res);
      },
      async sendForm() {},
    }
  };
</script>
