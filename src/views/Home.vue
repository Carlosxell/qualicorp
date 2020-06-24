<template>
  <div class="l-page--home">
    <form @submit.prevent="sendForm"
          autocomplete="off"
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

      <div class="l-col--12 l-col--Xs4">
        <div class="field">
          <label class="label is-small"
                 for="dataNascimento">Data de nascimento</label>
          <input class="input is-small"
                 id="dataNascimento"
                 type="date"
                 v-model="formObj.datanascimento">
        </div>
      </div>

      <div class="l-col--12 l-col--Xs5">
        <AutoComplete @OnChange="changeEntities"
                      :data-list="entities"
                      :data-prop="entityInfo" />
      </div>

      <div class="l-col--12 l-col--Xs6 l-col--Md3 l-alignSelfY--endXs">
        <button class="button is-fullwidth is-small is-info"
                :class="{ 'is-loading': sendingForm }"
                :disabled="!formObj.entidade || !formObj.datanascimento"
                type="submit">Buscar Planos</button>
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
      entityInfo() {
        return {
          label: 'Entidades',
          labelItem: 'NomeFantasia',
          disabled: !this.formObj.profissao,
          value: this.formObj.entidade,
          placeholder: 'Ex: ABRACEM'
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
        sendingForm: false,
        formObj: {
          uf: '',
          cidade: '',
          entidade: '',
          profissao: '',
          datanascimento: '',
        },
        jobs: [],
        plans: [],
        states: [],
        cities: [],
        entities: [],
      };
    },
    created() {
      this.getInitialData();
    },
    methods: {
      clearEntity() {
        this.entidade = null;
        this.formObj.entidade = '';
      },
      async changeEntities(val) {
        if (!val.NomeFantasia) { return this.clearEntity(); }

        this.entidade = val;
        this.formObj.entidade = val.NomeFantasia;
      },
      clearJob() {
        this.profissao = null;
        this.formObj.profissao = '';
      },
      async changeJob(val) {
        if (val.profissao) {
          let { clearStrCharacters } = this.$options.filters;
          let cidade = clearStrCharacters(this.formObj.cidade).toLowerCase();
          let profissao = clearStrCharacters(val.profissao).toLowerCase();

          this.profissao = val;
          this.formObj.profissao = val.profissao;

          await getEntities(profissao, this.formObj.uf, cidade).then(res => this.entities = res);
        } else {
          return this.clearJob();
        }
      },
      clearCity() {
        this.cidade = null;
        this.formObj.cidade = '';
      },
      async changeCity(val) {
        let { clearStrCharacters } = this.$options.filters;
        let cidade = clearStrCharacters(val.nome).toLowerCase();

        if (!val.nome) { return this.clearCity(); }

        this.cidade = val;
        this.formObj.cidade = val.nome;
        await getJobs(this.formObj.uf, cidade).then(res => this.jobs = res);
      },
      async changeState() {
        this.clearCity();
        this.clearJob();
        this.clearEntity();
        this.jobs = [];
        this.cities = [];

        await getCities(this.formObj.uf).then(res => this.cities = res);
      },
      async getInitialData() {
        await getStates().then(res => this.states = res);
      },
      async sendForm() {
        this.sendingForm = true;
        let obj = { ...this.formObj };

        try {
          await getPlans(obj).then(res => {
            console.info(res, 'planos recebidos');
            this.plans = res;
          });
        } catch (e) {
          this.sendingForm = false;
        }
      },
    }
  };
</script>
