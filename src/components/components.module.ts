import { NgModule } from '@angular/core';
import { ChatBubbleComponent } from './chat-bubble/chat-bubble';
import { ElasticTextareaComponent } from './elastic-textarea/elastic-textarea';
import { IonicModule } from 'ionic-angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ChatBubbleComponent,
    ElasticTextareaComponent,
  ],
  exports: [
    ChatBubbleComponent,
    ElasticTextareaComponent,
  ],
  imports: [
    IonicModule,
    FormsModule
  ]
})
export class ComponentsModule { }
