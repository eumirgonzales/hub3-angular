import { Component, inject, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
// import { Auth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  email= '';
  password= '';

  emailDisplay = '';

  constructor(public auth: Auth) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }


  async register() {
		try {
			const user = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      console.log(user)
			return user;
		} catch (e) {
      console.log(e)
			return null;
		}
	}

	async login() {
		try {
			const user = await signInWithEmailAndPassword(this.auth, this.email, this.password);
      console.log(user.user.email)
      this.emailDisplay = user?.user?.email || '';
			return user;
		} catch (e) {
      console.log(e)
			return null;
		}
	}
}
