# 3. Paketleme İşlemi (Soru sormadan, hazır manifesti kullanarak)
      - name: Build Android App Bundle (.aab)
        run: |
          # init yerine doğrudan hazır manifest ile giriş yapıyoruz
          bubblewrap build --directory=./ --project=twa-manifest.json --yes
        env:
          BUBBLEWRAP_KEYSTORE_PASSWORD: ${{ secrets.KEYSTORE_PASSWORD }}
          BUBBLEWRAP_KEY_PASSWORD: ${{ secrets.KEY_PASSWORD }}
