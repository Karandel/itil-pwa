<template>
  <div>
    <v-btn outline color="primary" dark @click='$refs.fileInput.click()'>Вложения:</v-btn>
    <input type="file" multiple ref="fileInput" style="display: none" @change="handleFileChange($event)">
    <v-chip close
      outline
      color="primary"
      v-for="(attachment, index) in attachments"
      :key="index"
      @input="removeAttachment(index)">
      {{attachment.name}}
    </v-chip>
  </div>
</template>

<script>
export default {
  props: {
    attachments: Array
  },
  methods: {
    handleFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      for (var i = 0; i < files.length; i++) {
        this.attachments.push(files[i])
      }
      this.$refs.fileInput.value = ''
    },
    removeAttachment (index) {
      if (index > -1) {
        this.attachments.splice(index, 1)
      }
    }
  },
  name: 'AddAttachments'
}
</script>
