import {Component, OnInit, ViewChild} from '@angular/core';
import {FlashMessagesService} from 'ngx-flash-messages';
import {FirebaseService} from '../services/firebase.service';
import {TwitterService} from '../services/twitter.service';
import {ResultModel} from '../services/result.model';
import {ResultDisplayComponent} from '../result-display/result-display.component';

declare var Blockly: any;

@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.css']
})

export class BlocklyComponent implements OnInit {

  resultDisplay;

  constructor(
    private flashMessagesService: FlashMessagesService,
    private firebaseService: FirebaseService,
    private twitterService: TwitterService
  ) {
  }

  public toolbox =
    `<xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">
    <category name="Logic" colour="#5C81A6">
        <block type="controls_if"></block>
        <block type="logic_compare">
            <field name="OP">EQ</field>
        </block>
        <block type="logic_operation">
            <field name="OP">AND</field>
        </block>
        <block type="logic_negate"></block>
        <block type="logic_boolean">
            <field name="BOOL">TRUE</field>
        </block>
        <block type="logic_null"></block>
        <block type="logic_ternary"></block>
    </category>
    <category name="Loops" colour="#5CA65C">
        <block type="controls_repeat_ext">
            <value name="TIMES">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="controls_whileUntil">
            <field name="MODE">WHILE</field>
        </block>
        <block type="controls_for">
            <field name="VAR" id="TWD31WlVifV63ZP6vMC~" variabletype="">i</field>
            <value name="FROM">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="TO">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
            <value name="BY">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="controls_forEach">
            <field name="VAR" id="1E#/ieTE6ryfCX*05^S" variabletype="">j</field>
        </block>
        <block type="controls_flow_statements">
            <field name="FLOW">BREAK</field>
        </block>
    </category>
    <category name="Math" colour="#5C68A6">
        <block type="math_round">
            <field name="OP">ROUND</field>
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">3.1</field>
                </shadow>
            </value>
        </block>
        <block type="math_number">
            <field name="NUM">0</field>
        </block>
        <block type="math_single">
            <field name="OP">ROOT</field>
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">9</field>
                </shadow>
            </value>
        </block>
        <block type="math_trig">
            <field name="OP">SIN</field>
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">45</field>
                </shadow>
            </value>
        </block>
        <block type="math_constant">
            <field name="CONSTANT">PI</field>
        </block>
        <block type="math_number_property">
            <mutation divisor_input="false"></mutation>
            <field name="PROPERTY">EVEN</field>
            <value name="NUMBER_TO_CHECK">
                <shadow type="math_number">
                    <field name="NUM">0</field>
                </shadow>
            </value>
        </block>
        <block type="math_arithmetic">
            <field name="OP">ADD</field>
            <value name="A">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="B">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
        </block>
        <block type="math_on_list">
            <mutation op="SUM"></mutation>
            <field name="OP">SUM</field>
        </block>
        <block type="math_modulo">
            <value name="DIVIDEND">
                <shadow type="math_number">
                    <field name="NUM">64</field>
                </shadow>
            </value>
            <value name="DIVISOR">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="math_constrain">
            <value name="VALUE">
                <shadow type="math_number">
                    <field name="NUM">50</field>
                </shadow>
            </value>
            <value name="LOW">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="HIGH">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block type="math_random_int">
            <value name="FROM">
                <shadow type="math_number">
                    <field name="NUM">1</field>
                </shadow>
            </value>
            <value name="TO">
                <shadow type="math_number">
                    <field name="NUM">100</field>
                </shadow>
            </value>
        </block>
        <block type="math_random_float"></block>
    </category>
    <category name="Text" colour="#5CA68D">
        <block type="text_charAt">
            <mutation at="true"></mutation>
            <field name="WHERE">FROM_START</field>
            <value name="VALUE">
                <block type="variables_get">
                    <field name="VAR" id="uJtQDB4G4ZaKe.4Mkln3" variabletype="">text</field>
                </block>
            </value>
        </block>
        <block type="text">
            <field name="TEXT"></field>
        </block>
        <block type="text_append">
            <field name="VAR" id="bkgT?Q+Pzb{Pwz90n=Jg" variabletype="">item</field>
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT"></field>
                </shadow>
            </value>
        </block>
        <block type="text_length">
            <value name="VALUE">
                <shadow type="text">
                    <field name="TEXT">abc</field>
                </shadow>
            </value>
        </block>
        <block type="text_isEmpty">
            <value name="VALUE">
                <shadow type="text">
                    <field name="TEXT"></field>
                </shadow>
            </value>
        </block>
        <block type="text_indexOf">
            <field name="END">FIRST</field>
            <value name="VALUE">
                <block type="variables_get">
                    <field name="VAR" id="uJtQDB4G4ZaKe.4Mkln3" variabletype="">text</field>
                </block>
            </value>
            <value name="FIND">
                <shadow type="text">
                    <field name="TEXT">abc</field>
                </shadow>
            </value>
        </block>
        <block type="text_join">
            <mutation items="2"></mutation>
        </block>
        <block type="text_getSubstring">
            <mutation at1="true" at2="true"></mutation>
            <field name="WHERE1">FROM_START</field>
            <field name="WHERE2">FROM_START</field>
            <value name="STRING">
                <block type="variables_get">
                    <field name="VAR" id="uJtQDB4G4ZaKe.4Mkln3" variabletype="">text</field>
                </block>
            </value>
        </block>
        <block type="text_changeCase">
            <field name="CASE">UPPERCASE</field>
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">abc</field>
                </shadow>
            </value>
        </block>
        <block type="text_trim">
            <field name="MODE">BOTH</field>
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">abc</field>
                </shadow>
            </value>
        </block>
        <block type="text_print">
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">abc</field>
                </shadow>
            </value>
        </block>
        <block type="text_prompt_ext">
            <mutation type="TEXT"></mutation>
            <field name="TYPE">TEXT</field>
            <value name="TEXT">
                <shadow type="text">
                    <field name="TEXT">abc</field>
                </shadow>
            </value>
        </block>
    </category>
    <category name="Lists" colour="#745CA6">
        <block type="lists_indexOf">
            <field name="END">FIRST</field>
            <value name="VALUE">
                <block type="variables_get">
                    <field name="VAR" id="@|eFaNfze;*D8(]KS}X)" variabletype="">list</field>
                </block>
            </value>
        </block>
        <block type="lists_create_with">
            <mutation items="0"></mutation>
        </block>
        <block type="lists_repeat">
            <value name="NUM">
                <shadow type="math_number">
                    <field name="NUM">5</field>
                </shadow>
            </value>
        </block>
        <block type="lists_length"></block>
        <block type="lists_isEmpty"></block>
        <block type="lists_create_with">
            <mutation items="3"></mutation>
        </block>
        <block type="lists_getIndex">
            <mutation statement="false" at="true"></mutation>
            <field name="MODE">GET</field>
            <field name="WHERE">FROM_START</field>
            <value name="VALUE">
                <block type="variables_get">
                    <field name="VAR" id="@|eFaNfze;*D8(]KS}X)" variabletype="">list</field>
                </block>
            </value>
        </block>
        <block type="lists_setIndex">
            <mutation at="true"></mutation>
            <field name="MODE">SET</field>
            <field name="WHERE">FROM_START</field>
            <value name="LIST">
                <block type="variables_get">
                    <field name="VAR" id="@|eFaNfze;*D8(]KS}X)" variabletype="">list</field>
                </block>
            </value>
        </block>
        <block type="lists_getSublist">
            <mutation at1="true" at2="true"></mutation>
            <field name="WHERE1">FROM_START</field>
            <field name="WHERE2">FROM_START</field>
            <value name="LIST">
                <block type="variables_get">
                    <field name="VAR" id="@|eFaNfze;*D8(]KS}X)" variabletype="">list</field>
                </block>
            </value>
        </block>
        <block type="lists_split">
            <mutation mode="SPLIT"></mutation>
            <field name="MODE">SPLIT</field>
            <value name="DELIM">
                <shadow type="text">
                    <field name="TEXT">,</field>
                </shadow>
            </value>
        </block>
        <block type="lists_sort">
            <field name="TYPE">NUMERIC</field>
            <field name="DIRECTION">1</field>
        </block>
    </category>
    <sep></sep>
    <category name="Variables" colour="#A65C81" custom="VARIABLE"></category>
    <category name="Functions" colour="#9A5CA6" custom="PROCEDURE"></category>
</xml>`;

  private static calc_distribution(arr: ResultModel[]) {
    let positive = 0;
    let negative = 0;
    let neutral = 0;
    for (const res of arr) {
      if (res.score > 0) {
        positive++;
      } else if (res.score < 0) {
        negative++;
      } else {
        neutral++;
      }
    }
    console.log('updated, positive: ', positive, ', negative: ', negative, 'neutral: ', neutral);
    return {
      positive: positive,
      negative: negative,
      neutral: neutral
    };
  }

  ngOnInit() {
    this.createBlocks();
  }

  createBlocks() {
    return Blockly.inject('blocklyDiv', {toolbox: this.toolbox});
  }

  save_worksapce(): void {
    const msg_success = 'successfully saved current workspace!';
    const msg_fail = 'you need to login first';
    const user_name = sessionStorage.getItem('user_name');
    if (user_name) {
      const xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
      this.firebaseService.database().ref(user_name).set({
        saved_workspace: Blockly.Xml.domToText(xml)
      }).then(() => this.flashMessagesService.show(msg_success, {timeout: 10000}));
    } else {
      this.flashMessagesService.show(msg_fail, {timeout: 10000});
    }
  }

  restore_workspace(): void {
    const msg_success = 'successfully restored last saved workspace!';
    const msg_fail = 'you need to login first';
    const user_name = sessionStorage.getItem('user_name');
    if (user_name) {
      Blockly.mainWorkspace.clear();
      this.firebaseService.database().ref(user_name + '/saved_workspace')
        .on('value', xml_text_snapshot => {
          const dom = Blockly.Xml.textToDom(xml_text_snapshot.val());
          Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, dom);
          this.flashMessagesService.show(msg_success, {timeout: 10000});
        });
    } else {
      this.flashMessagesService.show(msg_fail, {timeout: 10000});
    }
  }



  @ViewChild(ResultDisplayComponent)
  set resultDisplayComponent (resultDisplay: ResultDisplayComponent) {
    this.resultDisplay = resultDisplay;
    console.log('successfully captured child component: ', resultDisplay);
  }
  run_query(): void {
    this.twitterService.get_tweets().subscribe({
      next: x => {
        console.log(typeof x);
        console.log(x);
        console.log(x.length);
        const distribution = BlocklyComponent.calc_distribution(x);
        this.resultDisplay.update_contents(
          distribution.positive,
          distribution.negative,
          distribution.neutral
        );
      },
      error: err => console.log('cannot update, ', err),
      complete: () => console.log('query completed')
    });
  }
}
