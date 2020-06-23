<template>
  <div class="l-page--home">
    <form @submit.prevent="sendForm"
          class="form columns"
          novalidate>
      <div class="column is-6-tablet is-4-desktop">
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

      <div class="column is-6-tablet is-4-desktop">
        <AutoComplete @OnChange="changeCity"
                      :data-list="cities"
                      :data-prop="cityInfo" />
      </div>

      <div class="column is-6-tablet is-4-desktop">
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
      changeJob(val) {},
      clearCityStg(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(' ', '%20');
      },
      async changeCity(val) {
        let cidade = this.clearCityStg(val.nome);
        this.cidade = val;
        this.formObj.cidade = val.nome;
        await getJobs(this.formObj.uf, cidade).then(res => this.jobs = res);
      },
      async changeState() {
        if (!this.formObj.uf) {
          this.cities = [];
          return;
        }
        await getCities(this.formObj.uf).then(res => this.cities = res);
      },
      async getInitialData() {
        await getStates().then(res => this.states = res);
      },
      async sendForm() {},
    }
  };
</script>
