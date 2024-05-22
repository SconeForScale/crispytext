<script setup>
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import { ref } from 'vue';

const character_limit = ref(100)
const prefix = ref("/p")

const input_text = ref("")
const output_text_blocks = ref([])

async function formatText() {
    if ((character_limit.value == 0) || (input_text.value == "")) {
        return
    }
    output_text_blocks.value = []

    const words = input_text.value.split(/(\s+)/);
    output_text_blocks.value.push(prefix.value)
    words.forEach((word) => {
        var num_blocks = output_text_blocks.value.length
        // TODO dynamic continuation
        if (output_text_blocks.value[num_blocks-1].concat(" ", word).length > (character_limit.value - 2)) {
            output_text_blocks.value[num_blocks-1] = output_text_blocks.value[num_blocks-1].concat(" >")
            output_text_blocks.value.push("".concat(prefix.value, " ", word))
        } else {
            output_text_blocks.value[num_blocks-1] = output_text_blocks.value[num_blocks-1].concat(" ", word)
        }

    })
    
}

</script>

<template>
    <div>
        <InputGroup>
            <InputGroupAddon>
                <a>Character Limit:</a>
            </InputGroupAddon>
            <InputNumber v-model="character_limit" placeholder="Character Limit" />
        </InputGroup>

        <InputGroup>
            <InputGroupAddon>
                <a>Chat prefix:</a>
            </InputGroupAddon>
            <InputText v-model="prefix"/>
        </InputGroup>
    </div>
    <div class="flex flex-column md:flex-row">
        <div class="w-full md:w-5 flex flex-column card">
            <Textarea v-model="input_text" class="h-20rem"></Textarea>
            <Button label="Format" @click="formatText"></Button>
        </div>
        <div class="w-full md:w-1">
            <Divider layout="vertical" class="md:flex"></Divider>
        </div>
        <div class="w-full md:w-5 flex flex-column card">
            <ul style="list-style: none;">
                <li v-for="output_text in output_text_blocks">
                    <p>{{ output_text }}</p>
                    <Divider layout="horizontal"></Divider>
                </li>
            </ul>
        </div>
    </div>
</template>