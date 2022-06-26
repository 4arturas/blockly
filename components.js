Blockly.Blocks['collection'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Collection")
            .appendField(new Blockly.FieldDropdown([["Collection 1","1"], ["Collection 2","2"], ["Collection","3"]]), "collectionName");
        this.appendStatementInput("suites")
            .setCheck(null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript['collection'] = function(block) {
    var dropdown_collectionname = block.getFieldValue('collectionName');
    var statements_suites = Blockly.JavaScript.statementToCode(block, 'suites');
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
};


Blockly.Blocks['suite'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Suite ")
            .appendField(new Blockly.FieldDropdown([["Suite1","1"], ["Suite2","2"], ["Suite3","3"]]), "suiteName");
        this.appendStatementInput("cases")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript['suite'] = function(block) {
    var dropdown_suitename = block.getFieldValue('suiteName');
    var statements_suites = Blockly.JavaScript.statementToCode(block, 'suites');
    // TODO: Assemble JavaScript into code variable.
    var code = '...;\n';
    return code;
};

Blockly.Blocks['html'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("<html>");
        this.appendStatementInput("s_html")
            .setCheck(null);
        this.appendDummyInput()
            .appendField("</html>");
        this.setPreviousStatement(true, null);
        this.setColour(330);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
        this.setMutator(new Blockly.Mutator(['text']));
    },


    decompose: function(workspace) {
        var containerBlock = workspace.newBlock('html');
        containerBlock.initSvg();
        return containerBlock;
    },


    compose: function(containerBlock) {
        //...
        this.appendDummyInput()
            .appendField("hello");
    }
};




Blockly.JavaScript['html'] = function(block) {
    var statements_s_html = Blockly.JavaScript.statementToCode(block, 's_html');
    // TODO: Assemble JavaScript into code variable.

    var code = '<html> \n' + statements_s_html + '</html>';
    return code;
};

////////////////////////////////////////
//**************************************************************************
//Definition of the enable block (optional connection depending on checkbox)
//**************************************************************************
Blockly.Blocks['en'] = {
    init: function() {
        var checkbox = new Blockly.FieldCheckbox("TRUE", function(pxchecked) {
            this.sourceBlock_.updateShape_(pxchecked);
        });
        this.setInputsInline(false);
        this.appendDummyInput()
            .appendField("Unit")
            .appendField(new Blockly.FieldTextInput("C01"), "ENName");
        this.appendDummyInput()
            .appendField("PX")
            .appendField(checkbox, 'HasPX');
        this.setPreviousStatement(true, ["C", "EN"]);
        this.setNextStatement(true, ["C", "EN"]);
        this.setColour(40);
    },
    /**
     * Create XML to represent whether the 'pxchecked' should be present.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function() {
        var container = document.createElement('mutation');
        var pxchecked = (this.getFieldValue('HasPX') === 'TRUE');
        container.setAttribute('pxchecked', pxchecked);
        return container;
    },
    /**
     * Parse XML to restore the 'pxchecked'.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function(xmlElement) {
        var pxchecked = (xmlElement.getAttribute('pxchecked') === 'true');
        this.updateShape_(pxchecked);
    },
    /**
     * Modify this block to have (or not have) an input for 'HasPX'.
     * @param {boolean} pxchecked True if this block HasPX is pxchecked.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function(pxchecked) {
        // Add or remove a Value Input.
        if (pxchecked) {
            this.appendValueInput("PX")
                .setCheck('PX');
        } else {
            if (this.childBlocks_.length > 0) {
                for (var i = 0; i < this.childBlocks_.length; i++) {
                    if (this.childBlocks_[i].type === 'px') {
                        this.childBlocks_[i].unplug();
                        break;
                    }
                }
            }
            this.removeInput('PX');
        }
    }
};

///////////////////////////////////
RANGE_MIN = 2;
RANGE_MAX = 5;

Blockly.Blocks['foo'] = {

    init: function() {

        var inputsC = RANGE_MIN;

        this.setOutput(true, 'FOO');
        this.setColour(100);
        this.setInputsInline(true);

        this.appendValueInput('in1')
        this.appendValueInput('in2')
            .appendField('foo')
    },

    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('inputCount', this.inputsC);
        return container;
    },


    domToMutation: function (xmlElement) {
        this.inputsC = parseInt(xmlElement.getAttribute('inputCount'), 10) || RANGE_MIN;
        this.updateShape_();
    },

    updateShape_: function() {
        this.removeInput('in1');

        if(this.inputsC === RANGE_MIN){
            this.appendValueInput('in1')
                .appendField(new Blockly.FieldImage(
                    "https://fonts.gstatic.com/s/i/materialiconsoutlined/add/v4/24px.svg?download=true",
                    15,
                    15,
                    "*", function() {
                        this.getSourceBlock().plus_();
                    } ));
        }
        else if(this.inputsC === RANGE_MAX){
            this.appendValueInput('in1')
                .appendField(new Blockly.FieldImage(
                    "https://fonts.gstatic.com/s/i/materialiconsoutlined/remove/v4/24px.svg?download=true",
                    15,
                    15,
                    "*", function() {
                        this.getSourceBlock().minus_();
                    } ));
        }
        else{
            this.appendValueInput('in1')
                .appendField(new Blockly.FieldImage(
                    "https://fonts.gstatic.com/s/i/materialiconsoutlined/remove/v4/24px.svg?download=true",
                    15,
                    15,
                    "*", function() {
                        this.getSourceBlock().minus_();
                    } ))
                .appendField(new Blockly.FieldImage(
                    "https://fonts.gstatic.com/s/i/materialiconsoutlined/add/v4/24px.svg?download=true",
                    15,
                    15,
                    "*", function() {
                        this.getSourceBlock().plus_();
                    } ));
        }

        var i = 2;
        while (this.getInput('in' + i)) {
            this.removeInput('in' + i);
            i++;
        }

        for (var x = 2; x <= this.inputsC; x++) {
            this.appendValueInput('in' + x)
                .appendField('foo')
        }
    },


    plus_: function (){
        this.inputsC = (this.inputsC + 1);
        this.updateShape_();
    },

    minus_: function (){
        this.inputsC = (this.inputsC - 1);
        this.updateShape_();
    }
};